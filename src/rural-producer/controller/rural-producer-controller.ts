import { Request, Response } from 'express';

import { makeBaseService } from '../factories/make-base-service';
import { RegisterRuralProducerParams, UpdateParams } from '../interfaces/interfaces';
import { DeleteRuralProducerService } from '../service/delete-rural-producer-service';
import { RegisterRuralProducerService } from '../service/register-rural-producer-service';
import { UpdateRuralProducerService } from '../service/update-rural-producer-service';

export class RuralProducerController {
  public async register(request: Request, response: Response): Promise<Response> {
    const registerParams: RegisterRuralProducerParams = request.body;

    const registerService = makeBaseService(RegisterRuralProducerService);

    try {
      await registerService.execute(registerParams);

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
    const { id } = request.params;
    const updateParams: UpdateParams = request.body;

    const updateService = makeBaseService(UpdateRuralProducerService);

    try {
      await updateService.execute({ ...updateParams, id });

      return response.status(200).json({ message: 'Dados atualizados com sucesso!' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';

      return response.status(400).json({ message: errorMessage });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteService = makeBaseService(DeleteRuralProducerService);

    try {
      await deleteService.execute({ id });

      return response.status(200).json({ message: 'Produtor excluído com sucesso!' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';

      return response.status(400).json({ message: errorMessage });
    }
  }
}
