import ContactPerson from '../ContactPerson';

describe('ContactPerson class', () => {
  /**
   * Test Cases:
   * - Should throw an error when instantiating without payload
   * - Should not throw an error when instantiating with the required payload
   *   but other non-mandatory field is missing
   * - Should throw an error when the required payload have a field
   *   but the data type is not match with the schema
   * - When instantiating with the required payload and appropriate
   *   field,
   *   - Should create a ContactPerson object
   *   - Value from fields on a ContactPerson object can be changed with
   *     the appropriate setter
   *
   * ContactPerson payload doesn't have mandatory field
   *
   * ContactPerson payload have some non-mandatory fields:
   * name, phoneNumber
   */
  it('Should throw an error when instantiating without payload', () => {
    expect(() => new ContactPerson(null))
        .toThrowError('CONTACT_PERSON.NO_PAYLOAD');
  });

  it(`Should not throw an error when instantiating with the required payload 
    but other non-mandatory field is missing`, () => {
    const contactPerson = new ContactPerson({});
    expect(contactPerson.name).toEqual('');
    expect(contactPerson.phoneNumber).toEqual('');
  });

  it(`Should throw an error when the required payload have a field but the 
    data type is not match with the schema`, () => {
    const payload = {
      name: 'Agung',
      phoneNumber: 1234567890,
    };

    expect(() => new ContactPerson(payload))
        .toThrowError('CONTACT_PERSON.DATA_TYPE_NOT_MATCH');
  });

  describe(`When instantiating with the required payload and appropriate 
    field`, () => {
    let contactPerson: ContactPerson;
    const payload = {
      name: 'Agung',
      phoneNumber: '081234567890',
    };

    beforeAll(() => {
      contactPerson = new ContactPerson(payload);
    });

    it('Should create a ContactPerson object', () => {
      expect(contactPerson.name).toEqual(payload.name);
      expect(contactPerson.phoneNumber).toEqual(payload.phoneNumber);
    });

    it(`Value from fields on a ContactPerson object can be changed with the
    appropriate setter`, () => {
      const newPayload = {
        name: 'Ragil',
        phoneNumber: '089897969594',
      };

      contactPerson.name = newPayload.name;
      contactPerson.phoneNumber = newPayload.phoneNumber;

      expect(contactPerson.name).toEqual(newPayload.name);
      expect(contactPerson.phoneNumber).toEqual(newPayload.phoneNumber);
    });
  });
});
