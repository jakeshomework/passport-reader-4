import { gql } from "apollo-boost";

export default gql(`
	query GET_HIGHLIGHTS($var: String!){
		actualApiName(var:$var) {


	}
`);