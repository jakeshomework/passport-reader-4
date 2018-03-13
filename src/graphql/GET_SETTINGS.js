import { gql } from "apollo-boost";

export default gql(`
	query GET_SETTINGS($var: String!){
		actualApiName(var:$var) {


	}
`);