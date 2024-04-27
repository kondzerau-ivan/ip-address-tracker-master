import {validateIp} from './helpers';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');

const infoIp = document.getElementById('ip');
const infoLocation = document.getElementById('location');
const infoTimezone = document.getElementById('timezone');
const infoIsp = document.getElementById('isp');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

function getData() {
  if(validateIp(ipInput.value)) {
    fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_YI3SVi53R1KYCzrLGYBsa5tkrU9X1&ipAddress=${ipInput.value}`)
    .then(response => response.json())
    .then(setInfo);
  }
}

function handleKey(event) {
  if (event.key === 'Enter') {
    getData();
  }
}

function setInfo ({ip, location, isp}) {
  infoIp.innerText = ip;
  infoLocation.innerText = `${location.country} / ${location.region}`;
  infoTimezone.innerText = location.timezone;
  infoIsp.innerText = isp;
}