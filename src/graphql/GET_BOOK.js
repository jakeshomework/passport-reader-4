import { gql } from "apollo-boost";

export default gql(`
	query GET_BOOK($var: String!){
		actualApiName(var:$var) {


	}
`);