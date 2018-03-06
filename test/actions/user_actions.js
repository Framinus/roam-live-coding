const { expect } = require('chai')
const { resetDb } = require('../utilities/db_reset')
const addUser = require('../../src/actions/addUser')
const { comparePassword } = require('../../src/utilities/password')

describe('add new user', function() {
  let newUser
  const name = 'Joe Schmo'
  const email = 'joe@schmo.com'
  const password = 'i<3janeschmo'
  const primary_city = 'schmotown'
  beforeEach(() => {
    return resetDb()
    .then(() => addUser(name, email, password, primary_city))
    .then(user => { newUser = user })
  })
  it('creates a new userId', () => {
    expect(newUser.id).to.be.a('number')
  })
  it('adds the name to the database', () => {
    expect(newUser.name).to.equal(name)
  })
  it('adds the correct encrypted password to the database', () => {
    return comparePassword(password, newUser.password)
      .then(result => expect(result).to.be.true)
  })
  it('adds the email to the database', () => {
    expect(newUser.email).to.equal(email)
  })
  it('adds the primary_city to the database', () => {
    expect(newUser.primary_city).to.equal(primary_city)
  })
})