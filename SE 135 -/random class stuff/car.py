class Car:
    def __init__(self, make, model, year, color):
        self.make = make
        self.model = model
        self.year = year
        self.color = color

    def __str__(self):
        return f"{self.year} {self.color} {self.make} {self.model}"

my_car = Car("Toyota", "Corolla", 2020, "Red")

print(my_car)