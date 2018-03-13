import { gql } from "apollo-boost";

export default gql(`
	mutation CLOSE_ANNOTAION_MODAL($var: String!){
		actualApiName(var:$var) {


	}
`);