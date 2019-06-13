const Validation = {
    isEmailValid: function(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    
    },
    isMobileValid:function(value){
        var format = /^[1-9]{1}[0-9]{9}$/
        return format.test(String(value).toLowerCase());
    },
    isFieldEmpty: function(text){
        return (text.length===0);

    },
    minLength: function(text, len){
        return !(text.length<len)
    },

    maxLength: function(text, len){
        return !(text.length>len)
    },

    sameLength: function(text, len){
    return (text.length===len)
},

    confirmPassword: function(text1, text2){
        return  (text1.trim() === text2.trim())
    },

    validates: function(type, value){
        if (type === 'required') {
            return this.validateRequired(value)
        }
        if(type === "name")
        {
            return this.validateName(value)
        }

        if(type === "email")
        {
            return this.validateEmail(value)
        }
        if(type === "mobile")
        {
            return this.validateMobile(value)
        }
        if(type === "password")
        {
            return this.validatePassword(value)
        }
        if (type === 'number') {
            return this.validateNumber(value)
        }
        
    },
    validateNumber(value) {
        if (this.isFieldEmpty(value)) {
            return 'Required'
        }
        if (isNaN(value)) {
            return 'Not a Number'
        }
    },
    validateRequired(value) {
        if (this.isFieldEmpty(value)) {
            return 'Required'
        }
    },
    validateEmail(value){
        if(this.isFieldEmpty(value))
        {
            return "Email Field is empty"
        }
        if(!this.isEmailValid(value)){
            return "Email is not valid"
        }
        return null
    },
    validateMobile(value){
        if(!value || this.isFieldEmpty(value))
        {
            return "Mobile Number Field is empty"
        }
        if(!this.isMobileValid(value)){
            return "Mobile Number  is not valid"
        }
        if(!this.sameLength(value,10)){
            return "Mobile Number  is not valid"
        }
        return null
    }
    ,
    validateName(value){
        if(this.isFieldEmpty(value))
        {
            return "Name Field is empty"
        }

        return null
    },
    validatePassword(value){
        if(this.isFieldEmpty(value))
        {
            return "Password Field is empty"
        } else if(!this.minLength(value, 4))
        {
            return "Password must be at least 5 characters long"
        } else if(!this.maxLength(value,20))
        {
            return "Password must not exceed 20 characters long"
        }
        return null
    }
}

export default Validation;