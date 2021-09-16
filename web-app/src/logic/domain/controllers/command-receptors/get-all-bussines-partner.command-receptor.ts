import { BussinesPartner } from "../../models/bussines-partner";
import { AbstractCommandReceptor } from "./abstract-command-receptor";

export abstract class GetAllBussinesPartnerCommandReceptor extends AbstractCommandReceptor<BussinesPartner[]> {}
