define([
    'jquery',
    'mage/template',
    'mage/storage',
    'mage/url'
], function ($, template, storage) {

    $.widget('experius.postcode', {
        postcodeValidationRequest: null,

        options: {
            numberOfStreetLines: 1,
            inputFieldTemplate: 'text!Experius_Postcode/template/widget/fields/input.html',
            checkboxFieldTemplate: 'text!Experius_Postcode/template/widget/fields/checkbox.html',
            postcodeFieldSelector: '.field.zip',
            postcodeInputSelector: '[name="postcode"]',
            serviceUrl: 'rest/nl/V1/',
            postcodeApiEndpointUri: 'postcode/information',
            postcodeApiEndpointUrl: ''
        },

        _getCreateOptions: function () {
            return {
                postcodeApiEndpointUrl: this.options.serviceUrl.concat(this.options.postcodeApiEndpointUri)
            };
        },

        _create: function () {
            $(this.options.postcodeInputSelector).on('change', this._validatePostcode.bind(this))
        },

        _validatePostcode: function (event) {
            this.postcodeValidationRequest = $.Deferred();
            this._getPostcodeInformation(this.postcodeValidationRequest, '3523 TK', '147');
            
            $.when(this.postcodeValidationRequest).done(function (data) {
                console.log(data);
            });
        },

        _getPostcodeInformation: function (deferred, postcode, housenumber) {
            var payload;

            payload = {
                postcode: postcode,
                houseNumber: housenumber,
                houseNumberAddition: ''
            };

            return storage.post(
                this.options.postcodeApiEndpointUrl,
                JSON.stringify(payload)
            ).done(
                function (postcodeInformation) {
                    if (postcodeInformation) {
                        deferred.resolve(postcodeInformation);
                    } else {
                        deferred.reject();
                    }
                }
            ).fail(
                function () {
                    deferred.reject();
                }
            );
        }

    });

    return $.experius.postcode;
});
