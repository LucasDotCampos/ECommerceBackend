"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = __importDefault(require("../services"));
class AvaliationController {
    async create(request, response) {
        try {
            const { sector, device, avaliation, company } = request.body;
            if (sector === null || device === null || company === null) {
                return response.status(422);
            }
            else {
                const avaliationService = new services_1.default();
                const createAvaliation = await avaliationService.create({
                    sector,
                    device,
                    avaliation,
                    company,
                });
                return response.status(200).json(createAvaliation);
            }
        }
        catch (err) {
            return response.status(400).json(err.message);
        }
    }
    async getBySector(request, response) {
        try {
            const { company, sector } = request.params;
            const avaliationService = new services_1.default();
            const search = await avaliationService.getBySector(company, sector);
            return response.status(200).json(search);
        }
        catch (err) {
            return response.status(400).json(err.message);
        }
    }
    async getAllAvaliation(request, response) {
        try {
            const avaliationService = new services_1.default();
            const search = await avaliationService.getAllAvaliation();
            return response.status(200).json(search);
        }
        catch (err) {
            return response.status(400).json(err.message);
        }
    }
    async getByAvaliation(request, response) {
        try {
            const { company, sector, avaliation } = request.params;
            const avaliationService = new services_1.default();
            const search = await avaliationService.getByAvaliation(company, sector, avaliation);
            return response.status(200).json(search);
        }
        catch (err) {
            return response.status(400).json(err.message);
        }
    }
}
exports.default = AvaliationController;
