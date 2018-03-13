import { gql } from "apollo-boost";

export default gql(`
	mutation OPEN_ANNOTAION_MODAL($var: String!){
		actualApiName(var:$var) {


	}
`);