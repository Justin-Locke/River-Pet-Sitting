import RiverPetSittingClient from '../api/riverPetSittingClient';
import Header from '../components/header';
import BindingClass from '../util/bindingClass';
import DataStore from '../util/DataStore';
import { formatDateToMMDDYYYY } from '../util/dateUtils';

/**
 * Logic needed for the update reservation page of the website.
 */
class UpdateReservation extends BindingClass {
    constructor() {
        super();
        this.bindClassMethods([ 'mount', 'clientLoaded', 'submit', 'redirectToViewReservation', 'viewReservation'], this);
        this.dataStore = new DataStore();
        this.dataStore.addChangeListener(this.redirectToViewReservation);
        this.dataStore.addChangeListener(this.viewReservation);
        this.header = new Header(this.dataStore);
    }

    async clientLoaded() {
        const urlParams = new URLSearchParams(window.location.search);
        const reservationId = urlParams.get('id');

        const ogReservation = await this.client.viewReservation(reservationId);
        this.dataStore.set('ogReservation', ogReservation);
    }

    /**
     * Add the header to the page and load the MusicPlaylistClient.
     */
    mount() {

        this.header.addHeaderToPage();
        this.client = new RiverPetSittingClient();
        this.clientLoaded();
        document.getElementById('submit-btn').addEventListener('click', this.submit);
    }

    /**
     * Method to run when the update reservation submit button is pressed. Call the RiverPetSittingClient to update the
     * reservation.
     */
    async submit(evt) {
        evt.preventDefault();
        const errorMessageDisplay = document.getElementById('error-message');
        errorMessageDisplay.innerText = ``;
        errorMessageDisplay.classList.add('hidden');

        const createButton = document.getElementById('submit-btn');
        const origButtonText = createButton.innerText;
        createButton.innerText = 'updating...';

        const urlParams = new URLSearchParams(window.location.search);
        const reservationId = urlParams.get('id');
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

        //Make a updateReservationRequest
        const reservation = await this.client.updateReservation(
          reservationId,
          startDate,
          endDate,
          (error) => {
            createButton.innerText = origButtonText;
            errorMessageDisplay.innerText = `Error: ${error.message}`;
            errorMessageDisplay.classList.remove('hidden');
        });
        this.dataStore.set('reservation', reservation);
        
    }

    viewReservation() {
        const ogReservation = this.dataStore.get('ogReservation');
        if (ogReservation == null) {
            return;
        }
        document.getElementById('start-date').innerText = formatDateToMMDDYYYY(ogReservation.startDate);
        document.getElementById('end-date').innerText = formatDateToMMDDYYYY(ogReservation.endDate);
    }

    /**
     * When the pet is updated in the datastore, redirect to the Update Reservation page.
     */
    redirectToViewReservation() {
        const reservation = this.dataStore.get('reservation');
        if (reservation != null) {
            setTimeout(() => {
            window.location.href = `/viewReservation.html?id=${reservation.reservationId}`;
        }, 3000); //3000 milli = 3 sec
    }
    }
}

/**
 * Main method to run when the page contents have loaded.
 */
const main = async () => {
    const updateReservation = new UpdateReservation();
    updateReservation.mount();
};

window.addEventListener('DOMContentLoaded', main);
