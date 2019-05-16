const validator = require("validator");
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
  email: {
    type: String,
    required: false,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },

  password: {
    type: String,
    required: false,
    minlength: 4,
    trim: true,
    validate(value) {
      if (value.includes("password")) {
        throw new Error("Password cannot be password");
      }
    }
  },

  name: {
    type: String,
    required: false,
    maxlength: 100
  },

  gender: {
    type: String,
    required: false
  },

  age: {
    type: Number,
    max: 100
  }
});




studentSchema.pre("save", async function(next) {
  
  const student = this;
  student.password = await bcrypt.hash(student.password, 8)
  console.log('This is a PRE middleware')
  next();

});


const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
