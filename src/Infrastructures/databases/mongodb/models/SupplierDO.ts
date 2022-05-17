import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const supplierSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    minlength: 21,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    required: true,
    type: Object,
    detail: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  faxNumber: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
  website: {
    type: String,
    default: '',
  },
  licenses: {
    type: Object,
    pharmacy: {
      type: Object,
      licenseId: {
        type: String,
        default: '',
      },
      validityPeriod: {
        type: mongoose.Schema.Types.Date,
        default: null,
      },
    },
    medicalDevices: {
      type: Object,
      licenseId: {
        type: String,
        default: '',
      },
      validityPeriod: {
        type: mongoose.Schema.Types.Date,
        default: null,
      },
    },
  },
  contactPerson: {
    type: Object,
    name: {
      type: String,
      default: '',
    },
    phoneNumber: {
      type: String,
      default: '',
    },
  },
});

supplierSchema.plugin(uniqueValidator);

export default mongoose.model('SupplierDO', supplierSchema);
