<template>
    <div class="relative w-full h-screen">
        <!-- Map -->
        <l-map :zoom="13" :center="center" class="w-full h-full rounded-lg shadow-lg">
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors" />

            <!-- Multiple markers from stations -->
            <l-marker v-for="station in filteredStations" :key="station._id"
                :lat-lng="[station.location.latitude, station.location.longitude]">
                <l-popup>
                    <div class="text-sm">
                        <div class="font-bold">{{ station.name }}</div>
                        <div>Status: {{ station.status }}</div>
                        <div>Power: {{ station.powerOutput }} kW</div>
                        <div>Connector: {{ station.connectorType }}</div>
                        <div>Lat: {{ station.location.latitude }}</div>
                        <div>Lng: {{ station.location.longitude }}</div>
                    </div>
                </l-popup>
            </l-marker>
        </l-map>

        <!-- Floating Left Icons -->
        <div class="absolute top-4 right-105 flex flex-col space-y-3 z-99999">
            <button @click="activeView = 'locations'" class="p-2.5 rounded-lg shadow cursor-pointer "
                :class="{ 'bg-[#1B4D3E] text-[#F1E3D3]': activeView === 'locations', 'bg-white': activeView !== 'locations' }">
                <v-icon name="fa-map-marker-alt" scale="1.5" />
            </button>
            <button @click="activeView = 'chargers'" class="p-2.5 rounded-lg shadow cursor-pointer"
                :class="{ 'bg-[#1B4D3E] text-[#F1E3D3]': activeView === 'chargers', 'bg-white': activeView !== 'chargers' }">
                <v-icon name="ri-charging-pile-2-fill" scale="1.5" />
            </button>
        </div>

        <!-- Floating Sidebar -->
        <div
            class="absolute top-4 right-4 min-h-100 w-96 bg-white rounded-lg shadow-xl overflow-hidden z-99999 flex flex-col">
            <div class="bg-[#328E6E] text-white p-3 flex justify-between items-center">
                <h2 class="text-lg font-bold">{{ username }}</h2>
                <p @click="logout()" class="cursor-pointer"><v-icon name="co-account-logout" scale="1.3" /></p>
            </div>

            <div class="p-4 space-y-4 flex-1">
                <!-- Charger Form - Only shown when activeView is 'chargers' -->
                <div v-if="activeView === 'chargers'" class="space-y-2 ">
                    <input v-model="form.name" type="text" placeholder="Charger Name"
                        class="w-full p-1.5 border rounded-md" />
                    <input v-model="form.latitude" type="text" placeholder="Latitude"
                        class="w-full p-1.5 border rounded-md" />
                    <input v-model="form.longitude" type="text" placeholder="Longitude"
                        class="w-full p-1.5 border rounded-md" />
                    <input v-model="form.powerOutput" type="number" placeholder="Power Output (kW)"
                        class="w-full p-1.5 border rounded-md" />

                    <!-- Status -->
                    <div>
                        <label class="font-medium">Status:</label>
                        <select v-model="selectedStatus" class="w-full p-1.5 border rounded-md">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <!-- Connector Type -->
                    <div>
                        <label class="font-medium">Connector:</label>
                        <select v-model="selectedConnector" class="w-full p-1.5 border rounded-md">
                            <option value="type1">Type 1</option>
                            <option value="type2">Type 2</option>
                            <option value="ccs">CCS</option>
                            <option value="chademo">CHAdeMO</option>
                        </select>
                    </div>

                    <button v-if="!editingCharger" @click="addStation()"
                        class="w-full mt-2 bg-[#A27B5C] text-white py-2 rounded-md cursor-pointer">
                        Add Charger
                    </button>

                    <button v-if="editingCharger" @click="updateStation()"
                        class="w-full mt-2 bg-[#edb56a] text-white py-2 rounded-md cursor-pointer">
                        Update Charger
                    </button>
                </div>

                <!-- Charger List -->
                <div v-if="activeView === 'locations'" class="h-134 flex flex-col">
                    <h3 class="font-semibold text-gray-700 mb-2">Chargers</h3>
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="font-semibold text-gray-700 mb-2">Filters</h3>
                        <button @click="showFilters = !showFilters" class="text-[#18230F] cursor-pointer">
                            <v-icon :name="showFilters ? 'fa-eye-slash' : 'fa-filter'" scale="1.2" />
                        </button>
                    </div>
                    <div v-show="showFilters" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <!-- Status Filter -->
                        <div>
                            <p class="text-sm font-medium text-gray-600 mb-1">Status</p>
                            <div class="space-y-1">
                                <label class="flex items-center space-x-2">
                                    <input type="checkbox" value="active" v-model="filters.status" />
                                    <span>Active</span>
                                </label>
                                <label class="flex items-center space-x-2">
                                    <input type="checkbox" value="inactive" v-model="filters.status" />
                                    <span>Inactive</span>
                                </label>
                            </div>
                        </div>

                        <!-- Power Output Filter -->
                        <div>
                            <p class="text-sm font-medium text-gray-600 mb-1">Power Output (kW)</p>
                            <div class="space-y-1">
                                <label class="flex items-center space-x-2">
                                    <input type="checkbox" :value="{ min: 0, max: 50 }" v-model="filters.powerOutput" />
                                    <span>0–50 kW</span>
                                </label>
                                <label class="flex items-center space-x-2">
                                    <input type="checkbox" :value="{ min: 51, max: 150 }"
                                        v-model="filters.powerOutput" />
                                    <span>51–150 kW</span>
                                </label>
                                <label class="flex items-center space-x-2">
                                    <input type="checkbox" :value="{ min: 151, max: Infinity }"
                                        v-model="filters.powerOutput" />
                                    <span>151+ kW</span>
                                </label>
                            </div>
                        </div>

                        <!-- Connector Type Filter -->
                        <div class="sm:col-span-2">
                            <p class="text-sm font-medium text-gray-600 mb-1">Connector Type</p>
                            <div class="flex flex-wrap gap-4">
                                <label class="flex items-center space-x-2">
                                    <input type="checkbox" value="type1" v-model="filters.connectorType" />
                                    <span>Type 1</span>
                                </label>
                                <label class="flex items-center space-x-2">
                                    <input type="checkbox" value="type2" v-model="filters.connectorType" />
                                    <span>Type 2</span>
                                </label>
                                <label class="flex items-center space-x-2">
                                    <input type="checkbox" value="ccs" v-model="filters.connectorType" />
                                    <span>CCS</span>
                                </label>
                                <label class="flex items-center space-x-2">
                                    <input type="checkbox" value="chademo" v-model="filters.connectorType" />
                                    <span>CHAdeMO</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 overflow-y-auto scrollbar-hide">
                        <ul class="space-y-2 ">
                            <li v-for="station in filteredStations" :key="station._id"
                                class="p-2 rounded-md shadow-sm bg-gray-50">
                                <div class="font-bold">{{ station.name }}</div>
                                <div class="text-xs text-gray-600">
                                    {{ station.status }} | {{ station.powerOutput }}kW | {{ station.connectorType }}
                                </div>
                                <div class="text-xs text-gray-500">
                                    Lat: {{ station.location.latitude }}, Lng: {{ station.location.longitude }}
                                </div>

                                <!-- Edit/Delete -->
                                <div v-if="canModifyStation(station)" class="mt-1 flex space-x-2 text-sm">
                                    <button @click="editStation(station)"
                                        class="text-[#27391C] hover:underline cursor-pointer">
                                        <v-icon name="co-pencil" scale="1" />
                                    </button>
                                    <button @click="deleteStation(station)" class="text-red-600 hover:underline cursor-pointer">
                                        <v-icon name="px-trash" scale="1" />
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup, } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
const url = import.meta.env.VITE_BACKEND_API_URL;


L.Icon.Default.mergeOptions({
    iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
    iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
    shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

export default {
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
    },
    data() {
        return {
            showFilters: true,
            center: [51.505, -0.09],
            username: '',
            activeView: 'chargers',
            form: {
                name: '',
                latitude: '',
                longitude: '',
                powerOutput: '',
                status: '',
                connector: '',
            },
            filters: {
                status: [],
                powerOutput: [],
                connectorType: [],
            },
            editingCharger: null,
            stations: [],
            selectedStation: null,
        };
    },
    computed: {
        filteredStations() {
            return this.stations.filter(station => {
                const statusMatch =
                    this.filters.status.length === 0 ||
                    this.filters.status.includes(station.status);

                const connectorMatch =
                    this.filters.connectorType.length === 0 ||
                    this.filters.connectorType.includes(station.connectorType);

                const powerMatch =
                    this.filters.powerOutput.length === 0 ||
                    this.filters.powerOutput.some(range => {
                        const power = parseFloat(station.powerOutput);
                        return power >= range.min && power <= range.max;
                    });

                return statusMatch && powerMatch && connectorMatch;
            });
        },
        canModifyStation() {
            let currentUserId = null;
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                currentUserId = user?._id;
            } catch (e) {
                console.error('Invalid user in localStorage');
            }

            return (station) => {
                const createdBy = station.createdBy?._id || station.createdBy;
                console.log('Current User ID:', currentUserId);
                console.log('Station Created By:', createdBy);
                return createdBy === currentUserId;
            };
        },

    },


    mounted() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.username = user.name || 'Guest User';
        }
        this.getStations();
    },
    methods: {
        async addStation() {
            try {
                if (!this.isFormValid()) {
                    alert('Please fill in all fields before submitting.');
                    return;
                }
                const stationData = {
                    name: this.form.name,
                    location: {
                        latitude: this.parseCoordinate(this.form.latitude, 'latitude'),
                        longitude: this.parseCoordinate(this.form.longitude, 'longitude'),
                    },
                    powerOutput: this.form.powerOutput,
                    status: this.selectedStatus,
                    connectorType: this.selectedConnector
                };

                console.log('Adding station:', stationData);
                const response = await fetch(`${url}/api/station`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(stationData)
                });

                if (!response.ok) throw new Error('Failed to add station');

            

                // Reset the form
                this.resetForm();
                this.getStations();
                alert('Charger added successfully!');


            } catch (error) {
                console.error('Error adding station:', error);
            }
        },

        async updateStation() {

            if (!this.editingCharger) return;

            if (!this.isFormValid()) {
                alert('Please fill in all fields before submitting.');
                return;
            }

            const updatedStation = {
                name: this.form.name,
                location: {
                    latitude: this.parseCoordinate(this.form.latitude, 'latitude'),
                    longitude: this.parseCoordinate(this.form.longitude, 'longitude'),
                },
                powerOutput: this.form.powerOutput,
                status: this.selectedStatus,
                connectorType: this.selectedConnector,
            };

            fetch(`${url}/api/station/${this.editingCharger}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(updatedStation),
            })
                .then(res => res.json())
                .then(data => {
                    this.resetForm();
                    this.editingCharger = null;
                    alert('Charger updated successfully!');
                    this.getStations();

                })
                .catch(err => console.error(err));
        },

        editStation(station) {
            this.activeView = 'chargers';

            this.form.name = station.name;
            this.form.latitude = station.location.latitude;
            this.form.longitude = station.location.longitude;
            this.form.powerOutput = station.powerOutput;

            this.selectedStatus = station.status?.toLowerCase();
            this.selectedConnector = station.connectorType?.toLowerCase();

            this.editingCharger = station._id;

        },

        async deleteStation(station) {
            const stationId = station._id || station.id;
            try {
                const response = await fetch(`${url}/api/station/${stationId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) throw new Error('Failed to delete station');

                this.stations = this.stations.filter(station => station._id !== stationId);
                alert('Charger deleted successfully!');
            } catch (error) {
                console.error('Error deleting station:', error);
            }
        },

        async getStations() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.warn('No token found, redirecting to login...');
                    this.$router.push('/');
                    return;
                }

                const response = await fetch(`${url}/api/station`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to get stations');
                }

                const data = await response.json();
                this.stations = data.stations;
                console.log('Stations fetched:', this.stations);
            } catch (error) {
                console.error('Error fetching stations:', error);
            }
        },

        async logout() {
            try {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                this.$router.push('/');
            } catch (error) {
                console.error('Error during logout:', error);
            }
        },

parseCoordinate(value, type) {
    if (typeof value === 'number') {
        // Validate number ranges
        if (type === 'latitude' && (value < -90 || value > 90)) {
            throw new Error(`Latitude must be between -90 and 90 (got ${value})`);
        }
        if (type === 'longitude' && (value < -180 || value > 180)) {
            throw new Error(`Longitude must be between -180 and 180 (got ${value})`);
        }
        return value;
    }

    const str = String(value).trim().toUpperCase();
    // Extract number (allow negative signs and decimals)
    const num = parseFloat(str.replace(/[^0-9.-]/g, ''));

    if (isNaN(num)) {
        throw new Error(`Invalid ${type}: ${value}`);
    }

    // Validate ranges first
    if (type === 'latitude' && (Math.abs(num) > 90)) {
        throw new Error(`Latitude must be between -90 and 90 (got ${num})`);
    }
    if (type === 'longitude' && (Math.abs(num) > 180)) {
        throw new Error(`Longitude must be between -180 and 180 (got ${num})`);
    }

    // Apply sign based on direction
    if (type === 'latitude') {
        return str.includes('S') ? -Math.abs(num) : Math.abs(num);
    } else if (type === 'longitude') {
        return str.includes('W') ? -Math.abs(num) : Math.abs(num);
    }

    return num;
},

        isFormValid() {
            const { name, latitude, longitude, powerOutput } = this.form;
            return (
                name.trim() !== '' &&
                latitude !== '' &&
                longitude !== '' &&
                powerOutput !== '' &&
                this.selectedStatus !== '' &&
                this.selectedConnector.length > 0
            );
        },

        resetForm() {
            this.form = {
                name: '',
                latitude: '',
                longitude: '',
                power: ''
            };
            this.selectedStatus = '';
            this.selectedConnector = '';
        },


    }
};

</script>

<style scoped>
input[type="checkbox"] {
    accent-color: #2563eb;
}
</style>
