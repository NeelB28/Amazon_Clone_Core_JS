/*
    SOLUTION TO 17J VERY GOOD PROBLEM
    LEARN HOW TO IMPORT OBJECT OF CLASS CART-CLASS.JS INSTEAD OF CART.JS AND HOW TO USE IT EVERYWHERE
    INCLUDING THE TEST FOLDER WHERE WE REMOVE SPYON TOO BECAUSE OF OBJECT BEING IMPORTED THERE
    link:
    https://github.com/SuperSimpleDev/javascript-course/pull/96/files
*/

class Car {
  #brand; // making property private
  #model; // making property private
  // You can set a default value for a property
  // here, or in the constructor. They do the
  // same thing. This is just a shortcut.
  speed = 0; // speed can't be made private

  // because then code will not work because the RacerCar i.e. child class cannot access the private #speed property (private properties can only be accessed in the same class and not even in child class); so we need to keep speed a public property

  // In other languages a property can be public, private or protected = it can be accessed inside a class and its child classes
  // In JavaScript, a property can only be public or private and that's why OOP is less popular in js because of absence of some features like protected properties

  isTrunkOpen = false; // default value true: open false: closed
  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    // You can set a default value for a property
    // here or directly in the property above.
    // this.speed = 0;
  }

  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? "open" : "closed";
    console.log(
      `${this.#brand} ${this.#model} ${this.speed}km/h Trunk:${trunkStatus}`
    ); // this can be substitute or changed with anything so here we are substituting/changing/refering_it_to it with the objects we are creating
  }

  go() {
    if (!this.isTrunkOpen) {
      this.speed += 5; // this is a method that will increase the speed of the car
    }
    if (this.speed > 200) {
      this.speed = 200; // this is a method that will limit the speed of the car
    }
  }

  brake() {
    this.speed -= 5; // this is a method that will decrease the speed of the car
    if (this.speed <= 0) {
      this.speed = 0; // this is a method that will limit the speed of the car
    }
  }

  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    }
  }
  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

// So how a constructor will help?
// "this" will refer to the object we created car1
// car1.carDetils
// where carDetails is an arrat
// carDetails{
//    brand: "Toyota",
//    model: "Corolla"
// }
// therefore, car1.brand(car1 of Car class has been assigned with the carDetails.brand provided/passed in input/param) = carDetails.brand; (here brand: "Toyota");
// likewise for car1.model
// likewise for car2.model
const car1 = new Car({ brand: "Toyota", model: "Corolla" }); // not providing speed as default will be taken
const car2 = new Car({ brand: "Tesla", model: "Model 3" });

console.log(car1);
console.log(car2);
car1.displayInfo();
car1.go();
car1.go();
car1.go();
car1.brake();
car1.displayInfo();

// Trunk should not open since the car is moving.
car1.openTrunk();
car1.displayInfo();

car2.displayInfo();
car2.go();
car2.brake();
car2.brake();
car2.displayInfo();

// Trunk should open since the car is not moving.
car2.openTrunk();
// Car should not go since the trunk is open.
car2.go();
car2.displayInfo();

class RaceCar extends Car {
  acceleration;
  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  // now we will override this go method but no changes in brake method so don't include here or make any changes as it will be directly inherited
  go() {
    this.speed += this.acceleration;
    if (this.speed > 300) {
      this.speed = 300;
    }
  }

  // override
  openTrunk() {
    console.log("Race cars do not have a trunk");
  }

  // override
  closeTrunk() {
    console.log("Race cars do not have a trunk");
  }
}

const raceCar = new RaceCar({
  brand: "McLaren",
  model: "F1",
  acceleration: 20,
});

raceCar.go();
raceCar.go();
raceCar.go();
raceCar.displayInfo(); // go+go+go till that nodisplay so direct 60km/h = 20+20+20
raceCar.openTrunk();
raceCar.displayInfo();
raceCar.brake();
raceCar.displayInfo();
