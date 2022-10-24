import { list } from '@keystone-6/core'

import {
  password,
  relationship,
  text,
  timestamp,
} from '@keystone-6/core/fields'
import { cloudinaryImage } from '@keystone-6/cloudinary'

const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
  folder: `${process.env.CLOUDINARY_API_FOLDER}/pets`,
}

export default {
  User: list({
    fields: {
      phone: text({
        validation: { isRequired: true },
      }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),
      password: password({ validation: { isRequired: true } }),
      owner: relationship({
        ref: 'Owner.user',
      }),
      pets: relationship({
        ref: 'Pet.owner',
        many: true,
      }),
    },
  }),
  Owner: list({
    fields: {
      user: relationship({
        ref: 'User.owner',
      }),
      name: text({
        validation: { isRequired: true },
      }),
      lastName: text({
        validation: { isRequired: true },
      }),
      birthDay: timestamp({
        validation: { isRequired: true },
      }),
    },
  }),
  Pet: list({
    fields: {
      name: text({
        validation: { isRequired: true },
      }),
      owner: relationship({
        ref: 'User.pets',
      }),
      breed: relationship({
        ref: 'Breed',
      }),
      images: relationship({
        ref: 'PetImage',
        many: true,
      }),
    },
  }),
  PetImage: list({
    fields: {
      image: cloudinaryImage({
        cloudinary,
      }),
    },
  }),
  Breed: list({
    fields: {
      name: text({
        validation: { isRequired: true },
      }),
      description: text(),
    },
  }),
}
