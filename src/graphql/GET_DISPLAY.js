import { gql } from "apollo-boost";

export default gql(`
	query GET_DISPLAY($var: String!){
		actualApiName(var:$var) {


	}
`);