export default  {
    street: {
      presence: true,
      format: /^([^\d]*[^\d\s]) *(\d.*)$/
    },
    name: {
      presence: true,
      length: {
        maximum: 32
      }
    },
    phone: {
      format: /^([+,0](\d{1,3})\s?)?((\(\d{3,5}\)|\d{3,5})(\s)?)\d{3,8}$/,
      presence: true,
    },
    location: {
      presence: true,
    },
    email: {
      presence: true,
      email: true
    },
    notes: {
      length: {
        maximum: 512
      }
    },
    delivery: {
      numericality: true
    }
  };