import { gql } from "apollo-boost";

export default gql(`
	query FETCH_SETTINGS($var: String!){
		actualApiName(var:$var) {


	}
`);