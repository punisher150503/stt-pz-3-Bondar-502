/* eslint-env jest */

const apiIceAndFire = require('./anapioficeandfire')

jest.mock('./anapioficeandfire', () => {
    const originalModule = jest.requireActual('./anapioficeandfire');
    const resp = require('../__mocksData__/api.json')
    return {
        __esModule: true,
        ...originalModule,
        getListOfRestEndPoint: function () {
            return new Promise((resolve, reject) => {
                resolve({entity: resp})
            })
        },
    };
});

describe('#getBooks() using Promises', () => {
    it('should load books data', () => {
        apiIceAndFire.getListOfRestEndPoint()
            .then(data => {
                expect(data.entity.books).toBeDefined()
                expect(data.entity.books).toEqual('https://www.anapioficeandfire.com/api/books')
                expect(data.entity.houses).toBeDefined()
                expect(data.entity.houses).toEqual('https://www.anapioficeandfire.com/api/houses')
            })
    })
})

describe('#getHouses() using Promises', () => {
    it('should load houses data', () => {
        apiIceAndFire.getListOfRestEndPoint()
            .then(data => {
                expect(data.entity.houses).toBeDefined();
                expect(data.entity.houses).toEqual('https://www.anapioficeandfire.com/api/houses');
            });
    });
});

describe('#getSpecificHouse() using Promises', () => {
    it('should load specific house data', () => {
        const specificHouse = {
            name: "House Allyrion of Godsgrace",
            region: "Dorne"
        };
        // Моковані дані для будинку
        jest.spyOn(apiIceAndFire, 'getHouse').mockImplementation(() => Promise.resolve(specificHouse));

        apiIceAndFire.getHouse()
            .then(data => {
                expect(data).toBeDefined();
                expect(data.name).toEqual('House Allyrion of Godsgrace');
                expect(data.region).toEqual('Dorne');
            });
    });
});