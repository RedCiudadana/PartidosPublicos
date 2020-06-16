import Transform from '@ember-data/serializer/transform';

export default class FrenteAFrente extends Transform {
  deserialize(serialized) {
    return serialized;
  }

  serialize(deserialized) {
    return deserialized;
  }
}
