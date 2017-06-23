var chai = require('chai')
var chaiHttp = require('chai-http')
var Book = require('../app/model/book.js')
var should = chai.should();
var server = require('../server.js')
chai.use(chaiHttp)

describe('Books', function(){
	beforeEach(function(done){
		Book.remove({}, function(err){
			done();
		})
	})
})

describe('/GET book', function(){
	it('it should GET all the books', function(done){
		chai.request(server)
		.get('/books')
		.end(function(err, res){
			res.should.have.status(200)
			res.body.should.be.a('array');
			res.body.length.should.be.eql(0)
			.done();
		})
	})
})

describe('/POST book', function(){
	it('it should not POST book without pages field', function(done){
		
var book = {
	title:"The Lord of the Rings",
	author: "J.R.R Tolkien",
	year: 1954
}
		chai.request(server)
		.post('/books')
		.send(book)
		.end(function(err,res){
			res.should.have.status(200)
			res.body.should.have.property('errors')
			res.body.errors.should.have.property('pages')
			res.body.errors.should.have.property('kind').eql('required')
			.done()
		})
	})
})