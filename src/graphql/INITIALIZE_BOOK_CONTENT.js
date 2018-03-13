import { gql } from "apollo-boost";

export default gql(`
	mutation INITIALIZE_BOOK_CONTENT($var: String!){
		actualApiName(var:$var) {


	}
`);