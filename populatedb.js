#! /usr/bin/env node

console.log(
  'This script populates some test boats, manufacturers, designers and boat types to database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"',
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const mongoose = require('mongoose');
const Boat = require('./models/boat');
const Designer = require('./models/designer');
const Manufacturer = require('./models/manufacturer');
const Type = require('./models/type');

const boats = [];
const designers = [];
const manufacturers = [];
const types = [];

mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createTypes();
  await createDesigners();
  await createManufacturers();
  await createBoats();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function typeCreate(index, name) {
  const type = new Type({ name });
  await type.save();
  types[index] = type;
  console.log(`Added type: ${name}`);
}

async function designerCreate(index, first_name, last_name) {
  const designerDetail = { first_name, last_name };

  const designer = new Designer(designerDetail);

  await designer.save();
  designers[index] = designer;
  console.log(`Added designer: ${first_name} ${last_name}`);
}

async function manufacturerCreate(index, name, country, city) {
  const manufacturerDetail = {
    name,
    country,
    city,
  };

  const manufacturer = new Manufacturer(manufacturerDetail);
  await manufacturer.save();
  manufacturers[index] = manufacturer;
  console.log(`Added manufacturer: ${name}`);
}

async function boatCreate(
  index,
  model,
  manufacturer,
  designer,
  type,
  displacement,
  loa,
  lwl,
  beam,
  ballast,
) {
  const boatDetail = {
    model,
    displacement,
    loa,
    lwl,
    beam,
    ballast,
  };
  if (manufacturer != false) boatDetail.manufacturer = manufacturer;
  if (designer != false) boatDetail.designer = designer;
  if (type != false) boatDetail.type = type;

  const boat = new Boat(boatDetail);
  await boat.save();
  boats[index] = boatDetail;
  console.log(`Added boat: ${model}`);
}

async function createTypes() {
  console.log('Adding types');
  await Promise.all([
    typeCreate(0, 'Sailboat'),
    typeCreate(1, 'Power Boat'),
    typeCreate(2, 'Catamaran'),
  ]);
}

async function createDesigners() {
  console.log('Adding designers');
  await Promise.all([
    designerCreate(0, 'Ron', 'Holland'),
    designerCreate(1, 'William', 'Crealock'),
    designerCreate(2, 'Joshua', 'Slocum'),
  ]);
}

async function createManufacturers() {
  console.log('Adding Manufucturers');
  await Promise.all([
    manufacturerCreate(0, 'Nautor', 'Finland', 'Pietarsaari'),
    manufacturerCreate(1, 'Pacific Seacraft', 'USA', 'Seattle'),
    manufacturerCreate(2, 'Joshua Slocum', 'World', 'World'),
  ]);
}

async function createBoats() {
  console.log('Adding boats');
  await Promise.all([
    boatCreate(
      0,
      'Swan 42',
      manufacturers[0],
      designers[0],
      types[0],
      '22,000.00 lb / 9,979 kg',
      '42.00 ft / 12.80 m',
      '33.83 ft / 10.31 m',
      '12.96 ft / 3.95 m',
      '9,200.00 lb / 4,173 kg',
    ),
    boatCreate(
      1,
      'DANA 24 (PACIFIC SEACRAFT)',
      manufacturers[1],
      designers[1],
      types[0],
      '8,000.00 lb / 3,629 kg',
      '27.25 ft / 8.31 m',
      '21.42 ft / 6.53 m',
      '8.58 ft / 2.62 m',
      '3,200.00 lb / 1,451 kg',
    ),
    boatCreate(
      2,
      'Spray',
      manufacturers[2],
      designers[2],
      types[0],
      '12.71 (gross) (9 net)',
      '36 ft 9 in (11.20 m)',
      false,
      false,
      false,
    ),
  ]);
}
