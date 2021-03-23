class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    const thisVampSeniority = this.numberOfVampiresFromOriginal;
    const thatVampSeniority = vampire.numberOfVampiresFromOriginal;
    return thisVampSeniority < thatVampSeniority;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    let vampireFound = null;
    if (this.name === name) {
      return this;
    }
    if (this.offspring.length) {
      //use .some() to exit the loop when truthy value is found
      //so that it doesn't later get replaced by null
      this.offspring.some(v => vampireFound = v.vampireWithName(name));
    }
  return vampireFound;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let vampires = 0;
    vampires += this.offspring.length;
      for (const descendent of this.offspring) {
        const vampiresBelow = descendent.totalDescendents;
        vampires += vampiresBelow;
      
    }

    return vampires;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenialVampires = []; // 1
    if (this.yearConverted > 1980) {
      millenialVampires.push(this); // 2
    }
    for (const vampire of this.offspring) {
      const millenials = vampire.allMillennialVampires; // 3
      millenialVampires = millenialVampires.concat(millenials);
    }
    return millenialVampires;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
  }
}

module.exports = Vampire;

