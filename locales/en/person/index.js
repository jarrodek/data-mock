import firstName from './FirstName.js';
import lastName from './LastName.js';
import gender from './Gender.js';
import title from './Title.js';

/** @typedef {import('../../types').LocalePerson} LocalePerson */

const time = /** @type LocalePerson */ ({
  gender,
  firstName,
  lastName,
  title,
  suffix: {
    general: ["Jr.", "Sr.", "I", "II", "III", "IV", "V", "MD", "DDS", "PhD", "DVM"],
  },
  prefix: {
    general: ["Mr.", "Mrs.", "Ms.", "Miss", "Dr."],
  },
  templates: [
    "#{prefix} #{first_name} #{last_name}",
    "#{first_name} #{last_name} #{suffix}",
    "#{first_name} #{last_name}",
    "#{first_name} #{last_name}",
    "#{male_first_name} #{last_name}",
    "#{female_first_name} #{last_name}",
  ],
});

export default time;
