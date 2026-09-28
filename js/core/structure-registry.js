const STRUCTURE_INITIALIZERS = new Map();

function registerStructureInitializer(name, initializer) {
  if (typeof name !== 'string' || !name) return;
  if (typeof initializer !== 'function') return;
  STRUCTURE_INITIALIZERS.set(name, initializer);
}

function runStructureInitializers() {
  let changed = false;
  STRUCTURE_INITIALIZERS.forEach(function(initializer) {
    try {
      if (initializer()) changed = true;
    } catch (e) {}
  });
  return changed;
}
