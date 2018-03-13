import { gql } from "apollo-boost";

export default gql(`
	mutation DELETE_HIGHLIGHT($var: String!){
		actualApiName(var:$var) {


	}
`);