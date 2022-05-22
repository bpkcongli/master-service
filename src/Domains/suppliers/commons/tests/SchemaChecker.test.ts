import SchemaChecker from '../SchemaChecker';
import ContactPerson from '../../valueObjects/ContactPerson';

describe('Schema Checker', () => {
  /**
   * Test Cases:
   * - Should throw an error when no payload given
   * - Should throw an error when a payload doesn't have mandatory field
   * - Should throw an error when a payload doesn't meet the appropriate
   *   schema (data type)
   * - Should not throw an error when a payload have all mandatory field and
   *   have appropriate schema
   */
  const mandatorySchema = {
    username: 'string',
    password: 'string',
  };

  const nonMandatorySchema = {
    contactPerson: ContactPerson,
  };

  it('Should throw an error when no payload given', () => {
    const schemaChecker =
      new SchemaChecker(mandatorySchema, nonMandatorySchema);
    expect(() => schemaChecker.isHavePayload(null)).toThrowError('NO_PAYLOAD');
  });

  it(`Should throw an error when a payload doesn't have
    mandatory field`, () => {
    const payload = {
      username: 'bpkcongli',
    };

    const schemaChecker =
      new SchemaChecker(mandatorySchema, nonMandatorySchema);
    expect(() => schemaChecker.isHavePayload(payload))
        .not.toThrowError();
    expect(() => schemaChecker.isPayloadHaveMandatoryField(payload))
        .toThrowError('NOT_CONTAIN_MANDATORY_FIELD');
  });

  it(`Should throw an error when a payload doesn't meet the appropriate 
    schema (data type)`, () => {
    const payload = {
      username: 'bpkcongli',
      password: 'supersecret',
      contactPerson: {
        name: 'Andrian',
        phoneNumber: '081234567890',
      },
    };

    const schemaChecker =
      new SchemaChecker(mandatorySchema, nonMandatorySchema);
    expect(() => schemaChecker.isHavePayload(payload))
        .not.toThrowError();
    expect(() => schemaChecker.isPayloadHaveMandatoryField(payload))
        .not.toThrowError();
    expect(() => schemaChecker.isPayloadHaveAppropriateSchema(payload))
        .toThrowError('DATA_TYPE_NOT_MATCH');
  });

  it(`Should not throw an error when a payload have all mandatory field and
    have appropriate schema`, () => {
    const payload = {
      username: 'bpkcongli',
      password: 'supersecret',
      contactPerson: new ContactPerson({
        name: 'Andrian',
        phoneNumber: '081234567890',
      }),
    };

    const schemaChecker =
      new SchemaChecker(mandatorySchema, nonMandatorySchema);
    expect(() => schemaChecker.isHavePayload(payload))
        .not.toThrowError();
    expect(() => schemaChecker.isPayloadHaveMandatoryField(payload))
        .not.toThrowError();
    expect(() => schemaChecker.isPayloadHaveAppropriateSchema(payload))
        .not.toThrowError();
  });
});
