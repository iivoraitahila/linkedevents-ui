import React from 'react'

import { FormattedMessage } from 'react-intl'

import TextField from 'node_modules/material-ui-with-sass/src/js/text-field.jsx'
import Checkbox from 'node_modules/material-ui-with-sass/src/js/checkbox.jsx'

import ImageUpload from 'src/components/ImageUpload'
import HelAutoComplete from 'src/components/HelAutoComplete'

import API from 'src/api.js'

let helMainOptions = API.loadHelMainOptions();
let helTargetOptions = API.loadHelTargetOptions();
let helEventLangOptions = API.loadHelEventLangOptions();

let HelTextField = (props) => {
    let { required, floatingLabelText } = props

    if(required) {
        if(typeof floatingLabelText === 'string') {
            floatingLabelText += ' *'
        }
        if(typeof floatingLabelText === 'object') {
            floatingLabelText = (<span>{floatingLabelText} *</span>)
        }
    }

    return (<TextField {...props} floatingLabelText={floatingLabelText} />)
}

let FormHeader = (props) => (
    <div className="row">
        <legend className="col-xs-12">{ props.children }</legend>
    </div>
)

let SideField = (props) => (
    <div className="side-field col-xs-5 col-sm-push-1">
        { props.children }
    </div>
)

// NOTE: Not found in formsy-material-ui, use this for now
let CheckboxGroup = (props) => {
    let checkboxes = props.options.map((item) => (
        <span className={(props.itemClassName || '')}>
            <Checkbox name={props.group} value={item.value} label={<FormattedMessage id={item.value}/>} />
        </span>
    ))

    return (
        <fieldset className="checkbox-group">
            <legend className="col-xs-12">{props.groupLabel}</legend>
            {checkboxes}
        </fieldset>
    )
}

let FormFields = (props) => (
    <div>
        <div className="col-xs-12 highlighted-block">
            <div className="col-xs-6">
                <label>
                    <FormattedMessage id="event-presented-in-languages"/>
                </label>
            </div>
            <div className="col-xs-6">
                <div className="spread-evenly">
                    <Checkbox name="lang-fi" value="true" label={<FormattedMessage id="in-fi"/>} />
                    <Checkbox name="lang-sv" value="true" label={<FormattedMessage id="in-sv"/>} />
                    <Checkbox name="lang-en" value="true" label={<FormattedMessage id="in-en"/>} />
                </div>
            </div>
        </div>

        <FormHeader>
            <FormattedMessage id="event-description-fields-header"/>
        </FormHeader>

        <div className="row">
            <div className="col-xs-6">
                <HelTextField name="event-name" required={true} floatingLabelText={<FormattedMessage id="event-name"/>} />
                <HelTextField name="event-short-description" required={true} floatingLabelText={<FormattedMessage id="event-short-description"/>} />
                <HelTextField name="event-description" required={true} floatingLabelText={<FormattedMessage id="event-description"/>} />
                <HelTextField name="event-home-page" floatingLabelText={<FormattedMessage id="event-home-page"/>} />
            </div>
            <SideField>
                <label><FormattedMessage id="event-picture"/></label>
                <ImageUpload name="event-image" />
            </SideField>
        </div>

        <FormHeader>
            <FormattedMessage id="event-datetime-fields-header" />
        </FormHeader>
        <div className="row">
            <div className="col-xs-6">
                <HelTextField name="event-starting-date" required={true} floatingLabelText={<FormattedMessage id="event-starting-date"/>} />
                <HelTextField name="event-starting-time" floatingLabelText={<FormattedMessage id="event-starting-time"/>} />
                <HelTextField name="event-ending-date" floatingLabelText={<FormattedMessage id="event-ending-date"/>} />
                <HelTextField name="event-ending-time" floatingLabelText={<FormattedMessage id="event-ending-time"/>} />
            </div>
        </div>

        <FormHeader>
            <FormattedMessage id="event-location-fields-header" />
        </FormHeader>
        <div className="row">
            <div className="col-xs-6">
                <HelAutoComplete onSelection={(chosenRequest, index, dataSource) => { console.log('helo',chosenRequest, index, dataSource) }} />
                <HelTextField name="event-location-id" floatingLabelText={<FormattedMessage id="event-location-additional-info"/>} />
            </div>
        </div>

        <FormHeader>
            <FormattedMessage id="event-price-fields-header" />
        </FormHeader>
        <div className="row">
            <div className="col-xs-6">
                <Checkbox name="is-free" value="true" label={<FormattedMessage id="is-free"/>} />
                <HelTextField name="event-price" required={true} floatingLabelText={<FormattedMessage id="event-price"/>} />
                <HelTextField name="event-price-info" floatingLabelText={<FormattedMessage id="event-price-info"/>} />
                <HelTextField name="event-purchase-link" floatingLabelText={<FormattedMessage id="event-purchase-link"/>} />
            </div>
            <SideField>
                <p>Valitse onko tapahtumaan vapaa pääsy tai lisää tapahtuman hinta tekstimuodossa (esim. 5€/7€).</p>
                <p>Voit lisätä lisätietoja tapahtuman lipunmyynnistä, paikkavarauksista jne.</p>
                <p>Lisää myös mahdollinen linkki lipunmyyntiin.</p>
            </SideField>
        </div>

        <FormHeader>
            <FormattedMessage id="event-social-media-fields-header" />
        </FormHeader>
        <div className="row">
            <div className="col-xs-6">
                <HelTextField name="facebook-url" floatingLabelText={<FormattedMessage id="facebook-url"/>} />
                <HelTextField name="twitter-url" floatingLabelText={<FormattedMessage id="twitter-url"/>} />
                <HelTextField name="instagram-url" floatingLabelText={<FormattedMessage id="instagram-url"/>} />
            </div>
        </div>

        <FormHeader>
            <FormattedMessage id="event-categorization" />
        </FormHeader>
        <div className="row">
            <CheckboxGroup groupLabel={<FormattedMessage id="hel-main-categories"/>}
                            group="hel-main-categories"
                            itemClassName="col-xs-6"
                            options={helMainOptions} />
            <CheckboxGroup groupLabel={<FormattedMessage id="target-groups"/>}
                            group="target-groups"
                            itemClassName="col-xs-6"
                            options={helTargetOptions} />
            <CheckboxGroup groupLabel={<FormattedMessage id="event-languages"/>}
                            group="event-languages"
                            itemClassName="col-xs-6"
                            options={helEventLangOptions} />
        </div>
    </div>
)

export default FormFields
