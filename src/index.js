import 'babel-polyfill';
import 'leaflet/dist/leaflet.css';
import icon from '../images/icon-location.svg';
import L from 'leaflet';
import {validateIp, addTileLayer, getAdress, addOffset} from './helpers';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');

const infoIp = document.getElementById('ip');
const infoLocation = document.getElementById('location');
const infoTimezone = document.getElementById('timezone');
const infoIsp = document.getElementById('isp');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
});
const mapArea = document.querySelector('.map');
const map = L.map(mapArea).setView([51.505, -0.09], 13);;

L.marker([51.505, -0.09], {icon: markerIcon}).addTo(map);

addTileLayer(map);

function getData() {
  if(validateIp(ipInput.value)) {
    getAdress(ipInput.value).then(setInfo);
  }
}

function handleKey(event) {
  if (event.key === 'Enter') {
    getData();
  }
}

function setInfo ({ip, location, isp}) {
  const {lat, lng, country, city, timezone} = location;
  infoIp.innerText = ip;
  infoLocation.innerText = `${country} / ${city}`;
  infoTimezone.innerText = timezone;
  infoIsp.innerText = isp;
  
  map.setView([lat, lng]);
  L.marker([lat, lng], {icon: markerIcon}).addTo(map);
  
  if (matchMedia("(max-width: 1023px)").matches) {
    addOffset(map);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getAdress('45.83.147.10').then(setInfo);
});