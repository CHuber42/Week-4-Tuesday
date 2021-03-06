function AddressBook() {
  this.contacts = [];
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function (id) {
  for (var i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

  AddressBook.prototype.deleteContact = function(id) {
    for (var i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i]) {  
        if (this.contacts[i].id == id) {
          delete this.contacts[i];
          return true;
        }
      }
    };
    return false;
  }

function Contact (firstName, lastName, phoneNumber, emails, physicalAdd) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddresses = emails;
  this.physicalAddresses = physicalAdd;
}

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
}

function displayContactDetails(anAddressBook) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = new String;
  anAddressBook.contacts.forEach(contact => {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>" ;
  });
  contactsList.html(htmlForContactInfo);
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  })
}

function showContact(id) {
  var contact = addressBook.findContact(id);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".phys-residence").html(contact.physicalAddresses);
  $(".email-residence").html(contact.emailAddresses);

  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}



var addressBook = new AddressBook();
$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputPhysAddresses = [];
    var inputEmailAddresses = [];

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input.physAddressInput").each(function() {
      inputPhysAddresses.push(" | " + $(this).val() + " | ")
    })
    $("input.emailInput").each(function() {
      inputEmailAddresses.push(" | " + $(this).val() + " | ") 
    })

    $(".extraInput").remove()
    

    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputPhysAddresses, inputEmailAddresses);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })

  $("button.addPhys").click(function(event) {
    event.preventDefault();    
    $("#physAddress").after("<br><label for='physAddress' class='extraInput'>Address</label>    <input type='text' id='physAddress' class='physAddressInput extraInput'>")
  })
  $("button.addEmail").click(function(event) {
    event.preventDefault();    
    $("#email").after("<br><label for='email' class='extraInput'>Email</label><input type='text' id='email' class='emailInput extraInput'>")
  })
})