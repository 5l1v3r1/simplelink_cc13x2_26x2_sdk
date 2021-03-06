/*
 * Copyright (c) 2018 Texas Instruments Incorporated - http://www.ti.com
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * *  Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 * *  Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * *  Neither the name of Texas Instruments Incorporated nor the names of
 *    its contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
 
/*
 *  ======== ble_rf_config.syscfg.js ========
 */

"use strict";

// Get rf_config long descriptions
const Docs = system.getScript("/ti/ble5stack/rf_config/ble_rf_config_docs.js");

// Get common Script
const Common = system.getScript("/ti/ble5stack/ble_common.js");

// Get the rfDesign options according to the device
const rfDesignOptions = getRfDesignOptions(system.deviceData.deviceId);

const config = {
    name: "bleRadioConfig",
    displayName: "Radio",
    description: "Configure BLE Radio Settings",
    config: [
        {
            name: "rfDesign",
            displayName: "Based On RF Design",
            description: "Select which RF Design to use as a template",
            options: rfDesignOptions,
            default: rfDesignOptions[0].name,
            hidden: false
        },
        {
            // RF Front End Settings
            // Note: The use of these values completely depends on how the PCB is laid out.
            //       Please see Device Package and Evaluation Module (EM) Board below.
            name: "frontEndMode",
            displayName: "Front End Mode",
            default: "RF_FE_DIFFERENTIAL",
            longDescription: Docs.frontEndModeLongDescription,
            options: [
                {
                    displayName: "Differential",
                    name: "RF_FE_DIFFERENTIAL"
                },
                {
                    displayName: "Single Ended RFP",
                    name: "RF_FE_SINGLE_ENDED_RFP"
                },
                {
                    displayName: "Single Ended RFN",
                    name: "RF_FE_SINGLE_ENDED_RFN"
                },
                {
                    displayName: "Antenna Diversity RFP First",
                    name: "RF_FE_ANT_DIVERSITY_RFP_FIRST"
                },
                {
                    displayName: "Antenna Diversity RFN First",
                    name: "RF_FE_ANT_DIVERSITY_RFN_FIRST"
                },
                {
                    displayName: "Single Ended RFP External Pins",
                    name: "RF_FE_SINGLE_ENDED_RFP_EXT_PINS"
                },
                {
                    displayName: "Single Ended RFN External Pins",
                    name: "RF_FE_SINGLE_ENDED_RFN_EXT_PINS"
                }
            ]
        },
        {
            name: "biasConfiguration",
            displayName: "Bias Configuration",
            default: "RF_FE_INT_BIAS",
            longDescription: Docs.biasConfigurationLongDescription,
            options: [
                {
                    displayName: "Internal BIAS",
                    name: "RF_FE_INT_BIAS"
                },
                {
                    displayName: "External BIAS",
                    name: "RF_FE_EXT_BIAS"
                }
            ]
        },
        {
            name: "defaultTxPower",
            displayName: "Default Tx Power",
            default: "HCI_EXT_TX_POWER_0_DBM",
            description: "This is the Tx Power value the BLE stack will use",
            options: (inst) => {
                const configurable = [
                    { displayName: "-20", name: "HCI_EXT_TX_POWER_MINUS_20_DBM"},
                    { displayName: "-18", name: "HCI_EXT_TX_POWER_MINUS_18_DBM"},
                    { displayName: "-15", name: "HCI_EXT_TX_POWER_MINUS_15_DBM"},
                    { displayName: "-12", name: "HCI_EXT_TX_POWER_MINUS_12_DBM"},
                    { displayName: "-10", name: "HCI_EXT_TX_POWER_MINUS_10_DBM"},
                    { displayName: "-9",  name: "HCI_EXT_TX_POWER_MINUS_9_DBM"},
                    { displayName: "-6",  name: "HCI_EXT_TX_POWER_MINUS_6_DBM"},
                    { displayName: "-5",  name: "HCI_EXT_TX_POWER_MINUS_5_DBM"},
                    { displayName: "-3",  name: "HCI_EXT_TX_POWER_MINUS_3_DBM"},
                    { displayName: "0",   name: "HCI_EXT_TX_POWER_0_DBM"},
                    { displayName: "1",   name: "HCI_EXT_TX_POWER_1_DBM"},
                    { displayName: "2",   name: "HCI_EXT_TX_POWER_2_DBM"},
                    { displayName: "3",   name: "HCI_EXT_TX_POWER_3_DBM"},
                    { displayName: "4",   name: "HCI_EXT_TX_POWER_4_DBM"},
                    { displayName: "5",   name: "HCI_EXT_TX_POWER_5_DBM"},
                    { displayName: "14",  name: "HCI_EXT_TX_POWER_14_DBM"},
                    { displayName: "15",  name: "HCI_EXT_TX_POWER_15_DBM"},
                    { displayName: "16",  name: "HCI_EXT_TX_POWER_16_DBM"},
                    { displayName: "17",  name: "HCI_EXT_TX_POWER_17_DBM"},
                    { displayName: "18",  name: "HCI_EXT_TX_POWER_18_DBM"},
                    { displayName: "19",  name: "HCI_EXT_TX_POWER_19_DBM"},
                    { displayName: "20",  name: "HCI_EXT_TX_POWER_20_DBM"}]
                // Get the device PA table that will be used
                const txPowerTableType = Common.getRadioScript(inst.rfDesign,
                                         system.deviceData.deviceId).radioConfigParams.paExport;
                const currentOptions = txPowerTableType != "combined" ?
                                       configurable.filter(config => config.displayName.valueOf() <= 5)
                                       :configurable;
                return currentOptions;
            }
        }
    ]
}

/*
 * ======== getRfDesignOptions ========
 * Generates an array of SRFStudio compatible rfDesign options based on device
 *
 * @param deviceId - device being used
 *
 * @returns Array - Array of rfDesign options, if the device isn't supported,
 *                  returns null
 */
function getRfDesignOptions(deviceId)
{
    let newRfDesignOptions = null;
    if(deviceId === "CC1352P1F3RGZ")
    {
        newRfDesignOptions = [
            {name: "LAUNCHXL-CC1352P1"},
            {name: "LAUNCHXL-CC1352P-2"},
            {name: "LAUNCHXL-CC1352P-4"}
        ];
    }
    else if(deviceId === "CC1352R1F3RGZ")
    {
        newRfDesignOptions = [{name: "LAUNCHXL-CC1352R1"}];
    }
    else if(deviceId === "CC2642R1FRGZ")
    {
        newRfDesignOptions = [{name: "LAUNCHXL-CC26X2R1"}];
    }
    else if(deviceId === "CC2652R1FRGZ")
    {
        newRfDesignOptions = [{name: "LAUNCHXL-CC26X2R1"}];
    }
    else if(deviceId === "CC2652RB")
    {
        newRfDesignOptions = [{name: "LAUNCHXL-CC2652RB"}];
    }

    return(newRfDesignOptions);
}

/*
 * ======== validate ========
 * Validate this inst's configuration
 *
 * @param inst       - BLE instance to be validated
 * @param validation - object to hold detected validation issues
 */
function validate(inst, validation)
{
    let validOptions = inst.$module.$configByName.defaultTxPower.options(inst);
    const selectedOption = inst.defaultTxPower;
    if(!_.find(validOptions, (option)=> option.name == selectedOption))
    {
        validation.logError("Selected option is invalid, please select a valid option", inst, "defaultTxPower");
    }

    // Get the RF Design module
    const rfDesign = system.modules["/ti/devices/radioconfig/rfdesign"].$static;

    // inst.rfDesign configurable value should always be equal to
    // the value of the rfDesign configurable in rfdesign module
    if(inst.rfDesign !== rfDesign.rfDesign)
    {
        validation.logError(`Must match ${system.getReference(rfDesign,
            "rfDesign")} in the RF Design Module`, inst, "rfDesign");
    }
}

/*
 *  ======== moduleInstances ========
 *  Determines what modules are added as non-static submodules
 *
 *  @param inst  - Module instance containing the config that changed
 *  @returns     - Array containing dependency modules
 */
function moduleInstances(inst)
{
    const dependencyModule = [];

    // Get the board default rf settings
    const radioSettings = Common.getRadioScript(inst.rfDesign,system.deviceData.deviceId).radioConfigParams;

    let args = {
        $name: "RF_BLE_Setting",
        phyType: "bt5le1m",
        codeExportConfig: radioSettings,
        paramVisibility: false,
        permission: "ReadOnly"
    }

    if(inst.rfDesign == "LAUNCHXL-CC1352P-2")
    {
        args.highPA = true;
    }

	dependencyModule.push({
        name: "radioConfig",
        group: "bleRadioConfig",
        displayName: "BLE Radio Configuration",
        description: "The BLE module is not using RF_Mode from ti_radio_config.c",
        moduleName: "/ti/devices/radioconfig/settings/ble",
        collapsed: true,
        args: args
     });

    return(dependencyModule);
}

/*
 *  ======== exports ========
 *  Export the BLE RF Settings Configuration
 */
exports = {
    config: config,
    validate: validate,
    moduleInstances: moduleInstances
};