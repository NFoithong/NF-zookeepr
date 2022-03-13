const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers');
const { zookeepers } = require('../data/zookeepers.json');

jest.mock('fs');

test('creates an zookeepers object', () => {
    const zookeeper = createNewZookeeper({
        id: 'jhgdja3ng2',
        name: 'Darlene',
        age: 32,
        favoriteAnimal: "Sloths"
    }, zookeepers);

    expect(zookeeper.name).toBe('Darlene');
    expect(zookeeper.id).toBe('jhgdja3ng2');
    expect(zookeeper.age).toBe(32);
    expect(zookeeper.favoriteAnimal).toBe('Sloths');
});

test('filters by query', () => {
    const startingZookeepers = [{
            id: '3',
            name: 'Erica',
            age: 32,
            favoriteAnimal: "Sloths",
        },
        {
            id: "3",
            name: "Isabella",
            age: 67,
            favoriteAnimal: "bear",
        },
    ];

    const updatedZookeepers = filterByQuery({ age: 32 }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
    const startingZookeepers = [{
            id: '3',
            name: 'Erica',
            age: 32,
            favoriteAnimal: "Sloths",
        },
        {
            id: "3",
            name: "Isabella",
            age: 67,
            favoriteAnimal: "bear",
        },
    ];

    const result = findById('3', startingZookeepers);

    expect(result.name).toBe("Erica");
});

test("validates age", () => {
    const zookeeper = {
        id: '3',
        name: 'Erica',
        age: 32,
        favoriteAnimal: "Sloths",
    };

    const invalidZookeeper = {
        id: "3",
        name: "Isabella",
        age: '67',
        favoriteAnimal: "bear",
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});