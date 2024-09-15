import { Request, Response } from 'express';

import { makeBaseService } from '../factories/make-base-service';
import { DeleteRuralProducerService } from '../service/delete-rural-producer-service';
import { RegisterRuralProducerService } from '../service/register-rural-producer-service';
import { UpdateRuralProducerService } from '../service/update-rural-producer-service';

export class RuralProducerController {
  public async register(request: Request, response: Response): Promise<Response> {
    const { taxId, producerName, farmName, city, state, totalFarmArea, arableArea, vegetationArea, plantedCrops } =
      request.body;

    const registerService = makeBaseService(RegisterRuralProducerService);

    try {
      await registerService.execute({
        taxId,
        producerName,
        farmName,
        city,
        state,
        totalFarmArea,
        arableArea,
        vegetationArea,
        plantedCrops,
      });

      return response.status(201).json({ message: 'Produtor Rural cadastrado com sucesso!' });
    } catch (error: any) {
      console.error('Erro ao cadastrar produtor rural:', error);
      const statusCode = error.message.includes('já está cadastrado') ? 400 : 500;
      return response.status(statusCode).json({
        message: error.message || 'Erro ao cadastrar produtor rural. Por favor, tente novamente.',
      });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { totalFarmArea, arableArea, vegetationArea, plantedCrops } = request.body;

    const { id } = request.params;

    const updateService = makeBaseService(UpdateRuralProducerService);

    await updateService.execute({
      id,
      totalFarmArea,
      arableArea,
      vegetationArea,
      plantedCrops,
    });

    return response.status(200).json({ message: ' Produtor Rural atualizado com sucesso!' });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { taxId } = request.params;

    const deleteService = makeBaseService(DeleteRuralProducerService);

    await deleteService.execute({
      taxId,
    });

    return response.status(200).json({ message: ' Produtor excluido com sucesso!' });
  }
}
