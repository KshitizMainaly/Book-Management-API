const APIFeatures = require('../utils/apiFeatures');  

describe('APIFeatures', () => {
  let mockQuery;
  let apiFeatures;


  beforeEach(() => {
    mockQuery = {
      find: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),

    };
  });




  test('search() should call find with $or regex on title and author', () => {
    const queryStr = { keyword: 'test' };
    apiFeatures = new APIFeatures(mockQuery, queryStr).search();

    expect(mockQuery.find).toHaveBeenCalledWith({
      $or: [
        { title: { $regex: 'test', $options: 'i' } },
        { author: { $regex: 'test', $options: 'i' } }
      ]
    });
  });



  test('filter() should exclude non-filter fields and apply operators', () => {
    const queryStr = {
      keyword: 'test',
      limit: '5',
      page: '2',
      sort: 'title',
      rating: { gte: 4 },
    };

    apiFeatures = new APIFeatures(mockQuery, queryStr).filter();

    expect(mockQuery.find).toHaveBeenCalledWith({
      rating: { $gte: 4 }
    });
  });

  test('sort() should sort by queryStr.sort if provided', () => {
    const queryStr = { sort: 'title,-rating' };
    apiFeatures = new APIFeatures(mockQuery, queryStr).sort();

    expect(mockQuery.sort).toHaveBeenCalledWith('title -rating');
  });

  test('sort() should default to -createdAt if sort not provided', () => {
    const queryStr = {};
    apiFeatures = new APIFeatures(mockQuery, queryStr).sort();

    expect(mockQuery.sort).toHaveBeenCalledWith('-createdAt');
  });

  test('paginate() should call skip and limit with correct values', () => {
    const queryStr = { page: '3', limit: '20' };
    apiFeatures = new APIFeatures(mockQuery, queryStr).paginate();

    expect(mockQuery.skip).toHaveBeenCalledWith(40); // (3 - 1) * 20
    expect(mockQuery.limit).toHaveBeenCalledWith(20);
  });
});
