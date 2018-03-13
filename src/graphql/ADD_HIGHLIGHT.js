import { gql } from "apollo-boost";

export default gql(`
	mutation ADD_HIGHLIGHT($var: String!){
		actualApiName(var:$var) {


	}
`);