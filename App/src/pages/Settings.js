import React, { useEffect } from 'react';

const Settings = () => {
    useEffect(() => {
        // Load the PayPal API script dynamically
        const script = document.createElement('script');
        script.src = 'https://www.paypalobjects.com/js/external/api.js';
        script.async = true;

        script.onload = () => {
            // Initialize the PayPal login button when the script is loaded
            window.paypal.use(['login'], function (login) {
                login.render({
                    appid: 'AdRD2kbHVKXw3Rd0PqaV5yeKZtpxfEyLJo8A4O2JcSquCiZMFL9_yZLs-_y2FD_M3lKDd2v-zaUMuP4K',
                    authend: 'sandbox',
                    scopes: 'profile',
                    containerid: 'paypalButton',
                    responseType: 'code id_token',
                    locale: 'en-us',
                    buttonType: 'LWP',
                    buttonShape: 'rectangle',
                    buttonSize: 'md',
                    fullPage: 'false',
                    returnurl: 'localhost:4000/main/dashboard',
                });
            });
        };

        document.body.appendChild(script);

        return () => {
            // Clean up by removing the script when the component unmounts
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            {/* The PayPal login button will be rendered here */}
            <div id="paypalButton"></div>
        </div>
    );
};

export default Settings;
