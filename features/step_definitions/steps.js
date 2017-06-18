const { client } = require('nightwatch-cucumber')
const { defineSupportCode } = require('cucumber')

defineSupportCode(({ Given, Then, When }) => {

  var uniqueName = Math.random().toString(6).substr(2,8)

  Given(/^There are a number of records existing in the DB$/,() =>{
      return client
        .url('http://computer-database.herokuapp.com/computers')
        .waitForElementVisible('body',1000)
        .getText("#main h1",(result,newNum1)=> {

            var compNum = result.value

            var num1 = compNum.match(/([0-9]+|one)/)
            existingRecords = num1[1]
          })

      })

  Then (/^the number of records should increase by "(.*?)"$/,(num)=>{
      newVal = (+existingRecords)+(+num)
      return client.assert.containsText("#main h1", newVal)

  })

  Given(/^I open herokuapp`s search page$/, () => {
    return client
        .url('http://computer-database.herokuapp.com/computers')
        .waitForElementVisible('body', 1000)

  })

  Then(/^the title is "(.*?)"$/, (text) => {
    return client.assert.title(text)
  })

  Then(/^the computer search box exists$/, () => {
    return client.assert.visible('input[id="searchbox"]')
  })

  When(/^I filter by "(.*?)"$/, (text) => {
    return client
        .setValue('input[type=search]', text)
        .click('input[id="searchsubmit"]')

  })

  Then (/^I should see the list of computers with name "(.*?)"$/, (compName)=>{
    return client.assert.containsText("#main" , compName)
  })

  Then (/^I should see a message that no results were found$/, () => {
    return client.assert.containsText("#main",'Nothing to display')
  })

  Given(/^I have|save the computer record with the following details in the DB with company as MOS technology$/,(table)=>{
    var myData = table.raw()
    return client
      .url('http://computer-database.herokuapp.com/computers/new')
      .waitForElementVisible('body', 1000)
      .setValue('input[id="name"]', myData[0][1])
      .setValue('input[id="introduced"]',myData[1][1])
      .setValue('input[id="discontinued"]',myData[2][1])
      .click('select[id="company"] option[value="7"]')
      .click('input[value="Create this computer"]')
  })

  Given(/^I save the computer record with the following details in the DB$/,(table)=>{
    var myData = table.raw()
    return client
      .clearValue('input[id="name"]')
      .clearValue('input[id="introduced"]')
      .clearValue('input[id="discontinued"]')
      .setValue('input[id="name"]', myData[0][1])
      .setValue('input[id="introduced"]',myData[1][1])
      .setValue('input[id="discontinued"]',myData[2][1])
      .click('select[id="company"] option[value="1"]')
      .click('input[value="Save this computer"]')
      .waitForElementVisible('body', 1000)
  })

  Given(/^I save a computer with the following name "(.*?)" in the DB$/,(computerName)=>{
    return client
      .url('http://computer-database.herokuapp.com/computers/new')
      .waitForElementVisible('body', 1000)
      .setValue('input[id="name"]', computerName)
      .click('input[value="Create this computer"]')
  })

  Given(/^I save a valid computer record in the DB$/,() =>{
    return client
      .url('http://computer-database.herokuapp.com/computers/new')
      .waitForElementVisible('body', 1000)
      .setValue('input[id="name"]', uniqueName)
      .setValue('input[id="introduced"]',"2014-05-21")
      .setValue('input[id="discontinued"]',"2016-05-23")
      .click('select[id="company"] option[value="1"]')
      .click('input[value="Create this computer"]')
  })

  Then (/^I should see the confirmation that the record has been saved$/, () => {
    return client.assert.containsText("#main",'Done!')
  })

  Then (/^I should be able to find the same record$/, () => {

    return client
      .setValue('input[type=search]', uniqueName)
      .click('input[id="searchsubmit"]')
      .expect.element("#main h1").text.to.equal('One computer found')
  })

  When(/^I save a computer record without a name to the computer database$/,() =>{
    return client
      .url('http://computer-database.herokuapp.com/computers/new')
      .waitForElementVisible('body', 1000)
      .setValue('input[id="name"]', "")
      .setValue('input[id="introduced"]',"2014-05-21")
      .setValue('input[id="discontinued"]',"2016-05-23")
      .click('select[id="company"] option[value="1"]')
      .click('input[value="Create this computer"]')
  })

  Then (/^I should see an indication that the name field is required$/, () => {
    return client.assert.cssClassPresent("div.clearfix","error")
  })

  When(/^I enter valid data for all the fields in the add computer form$/,() =>{
    return client
      .url('http://computer-database.herokuapp.com/computers/new')
      .waitForElementVisible('body', 1000)
      .setValue('input[id="name"]', "")
      .setValue('input[id="introduced"]',"2014-05-23")
      .setValue('input[id="discontinued"]',"2016-05-23")
      .click('select[id="company"] option[value="1"]')

  })

  When(/^I cancel$/,() =>{
    return client
      .click('a[href="/computers"]')

  })


  When(/^I should be navigated back to the list of computers$/,() =>{
    return client.assert.containsText("#main",'computers found')


  })

  When(/^I edit the same computer record$/,() =>{
    return client
      .setValue('input[type=search]', uniqueName)
      .click('input[id="searchsubmit"]')
      .waitForElementVisible('body', 1000)
      .getAttribute("#main table.computers.zebra-striped tbody tr td a","href", (result) =>{
        return client.url(result.value)

      })
  })

  When(/^I save without editing$/,() =>{

    return client
      .click('input[value="Save this computer"]')
  })

  Then(/^the saved record should have the same name as original$/,() =>{
    return client
      .setValue('input[type=search]', uniqueName)
      .click('input[id="searchsubmit"]')
      .getAttribute("#main table.computers.zebra-striped tbody tr td a","href", (result) =>{
        return client.url(result.value)
      })
      .expect.element('input[id="name"]').to.have.value.that.equals(uniqueName)
  })

  Then(/^the same introduced date$/,() =>{
    return client
      .expect.element('input[id="introduced"]').to.have.value.that.equals("2014-05-21")
  })

  Then(/^the same discontinued date$/,() =>{
    return client
      .expect.element('input[id="discontinued"]').to.have.value.that.equals("2016-05-23")
  })

  Then(/^the same company$/,() =>{
    return client
      .expect.element('select[id="company"] option[value="1"]').to.be.selected
  })

  Then (/^the saved record should have the following details$/,(table)=>{
    var newData = table.raw()
    return client
      .setValue('input[type=search]', newData[0][1])
      .click('input[id="searchsubmit"]')
      .getAttribute("#main table.computers.zebra-striped tbody tr td a","href", (result) =>{
        return client.url(result.value)
      })
      client.expect.element('input[id="introduced"]').to.have.value.that.equals(newData[1][1])
      client.expect.element('input[id="discontinued"]').to.have.value.that.equals(newData[2][1])
      client.expect.element('select[id="company"] option[value="7"]').to.be.selected
  })


  When(/^I delete the record "(.*?)"$/, (text) => {
    return client
      .setValue('input[type=search]', text)
      .click('input[id="searchsubmit"]')
      .waitForElementVisible('body', 1000)
      .getAttribute("#main table.computers.zebra-striped tbody tr td a","href", (result) =>{
        return client.url(result.value)
      })
      .click('input[value="Delete this computer"]')
  })

  Then (/^I see a confirmation that the record is deleted$/, () => {
    return client.assert.containsText("#main",'Computer has been deleted')
  })
})