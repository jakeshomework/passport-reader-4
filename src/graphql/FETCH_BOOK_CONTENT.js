import { gql } from "apollo-boost";

export default gql(`
	query FETCH_BOOK_CONTENT($var: String!){
		actualApiName(var:$var) {


	}
`);