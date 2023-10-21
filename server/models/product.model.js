//import { toNumber } from 'lodash';
import mongoose from 'mongoose'
//const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
 name: {
  type: String,
  trim: true,
  required: 'Name is required'
 },

 description: {
  type: String,
  trim: true,
 },

 price: {
  type: Number,
  trim: true,
 },

 published: {
  type: Boolean,
  trim: true,
 },

 category: {
  type: String,
  trim: true,
  //unique: 'Email already exists',
  //match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  required: 'Category is required'
 },

 created: {
  type: Date,
  default: Date.now
    },

 updated: {
  type: Date,
  default: Date.now
  },

hashed_password: {
  type: String,
  //required: 'Password is required'
  },

  salt: String
  });

ProductSchema.virtual('password')
 .set(function(password) {
 this._password = password;
//this.salt = this.makeSalt();
this.hashed_password = password;
})

.get(function() {
return this._password;
 });
ProductSchema.path('hashed_password').validate(function(v) {
 if (this._password && this._password.length < 6) {
 this.invalidate('password', 'Password must be at least 6 characters.');
}
 if (this.isNew && !this._password) {
this.invalidate('password', 'Password is required');
 }
}, null);
//module.exports = mongoose.model('User', UserSchema);
export default mongoose.model('Product', ProductSchema);

