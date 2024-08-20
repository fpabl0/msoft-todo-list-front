import type ComputedProperty from '@ember/object/computed';

export function storageFor<T>(service?: string): ComputedProperty<T>;
