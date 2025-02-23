import mongoose from 'mongoose';

export const transactionSchema = new mongoose.Schema({
    account_id: { type: String, required: true },
    account_owner: { type: String },
    amount: { type: Number, required: true },
    authorized_date: { type: Date },
    category: [{ type: String }],
    category_id: { type: String },
    checknumber: { type: String },
    counterparties:[{
        name: { type: String },
        type: { type: String },
        logo_url: { type: String },
        entity_id: { type: String },
        confidence_level: { type: String },
    }],
    date: { type: Date, required: true },
    iso_currency_code: { type: String },
    location: {
        address: { type: String },
        city: { type: String },
        region: { type: String },
        postal_code: { type: String },
        country: { type: String },
        lat: { type: Number },
        lon: { type: Number },
        store_number: { type: String },
    },
    name: { type: String },
    merchant_name: { type: String },
    merchant_entity_id: { type: String },
    logo_url: { type: String },
    website: { type: String },
    payment_meta: {
        by_order_of: { type: String },
        payee: { type: String },
        payer: { type: String },
        payment_method: { type: String },
        payment_processor: { type: String },
        ppd_id: { type: String },
        reason: { type: String },
        reference_number: { type: String },
    },
    payment_channel: { type: String },
    pending: { type: Boolean },
    pending_transaction_id: { type: String },
    personal_fiance_category: {
        primary: { type: String },
        detailed: { type: String },
        confidence_level: { type: String },
    },
    personal_finance_category_icon_url: { type: String },
    transaction_id: { type: String, required: true},
    transaction_code: { type: String },
    transaction_type: { type: String },
    unofficial_currency_code: { type: String },
});


