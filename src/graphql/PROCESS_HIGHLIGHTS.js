import { gql } from "apollo-boost";

export default gql(`
	mutation PROCESS_HIGHLIGHTS($var: String!){
		actualApiName(var:$var) {


	}
`);