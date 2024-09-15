import { Request, Response } from 'express';

import { makeBaseService } from '../../factories/make-base-service';
import { DeleteRuralProducerService } from '../../service/delete-rural-producer-service';
import { UpdateRuralProducerService } from '../../service/update-rural-producer-service';
import { RuralProducerController } from '../rural-producer-controller';

jest.mock('@/rural-producer/factories/make-base-service');

describe('RuralProducerController - register', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn();
    mockStatus = jest.fn(() => ({ json: mockJson }));
    mockResponse = {
      status: mockStatus,
    } as Partial<Response>;

    mockRequest = {};
  });

  describe('register', () => {
    it('should register a rural producer successfully', async () => {
      const mockRegisterService = {
        execute: jest.fn().mockResolvedValueOnce({}),
      };
      (makeBaseService as jest.Mock).mockReturnValueOnce(mockRegisterService);

      const controller = new RuralProducerController();
      mockRequest.body = { taxId: '12345678901', producerName: 'Nome Produtor' };

      await controller.register(mockRequest as Request, mockResponse as Response);

      expect(mockRegisterService.execute).toHaveBeenCalledWith(mockRequest.body);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Produtor Rural cadastrado com sucesso!' });
    });

    it('should  return error 400 if the producer is already registered', async () => {
      const mockRegisterService = {
        execute: jest.fn().mockRejectedValueOnce(new Error('O tax_id informado já está cadastrado.')),
      };
      (makeBaseService as jest.Mock).mockReturnValueOnce(mockRegisterService);

      const controller = new RuralProducerController();
      mockRequest.body = { taxId: '12345678901', producerName: 'Nome Produtor' };

      await controller.register(mockRequest as Request, mockResponse as Response);

      expect(mockRegisterService.execute).toHaveBeenCalledWith(mockRequest.body);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        message: 'O tax_id informado já está cadastrado.',
      });
    });

    it('should return error 500 in case of generic failure', async () => {
      const mockRegisterService = {
        execute: jest.fn().mockRejectedValueOnce(new Error('Erro genérico')),
      };
      (makeBaseService as jest.Mock).mockReturnValueOnce(mockRegisterService);

      const controller = new RuralProducerController();
      mockRequest.body = { taxId: '12345678901', producerName: 'Nome Produtor' };

      await controller.register(mockRequest as Request, mockResponse as Response);

      expect(mockRegisterService.execute).toHaveBeenCalledWith(mockRequest.body);
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        message: 'Erro genérico',
      });
    });
  });
});

describe('RuralProducerController - update', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let controller: RuralProducerController;
  let mockUpdateService: Partial<UpdateRuralProducerService>;

  beforeEach(() => {
    mockUpdateService = {
      execute: jest.fn().mockResolvedValue({ message: 'Dados atualizados com sucesso!' }),
    };

    (makeBaseService as jest.Mock).mockReturnValue(mockUpdateService);

    mockRequest = {
      params: { id: '1' },
      body: { totalFarmArea: 100, arableArea: 50 },
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    controller = new RuralProducerController();
  });

  it('should update the data and return status 200', async () => {
    await controller.update(mockRequest as Request, mockResponse as Response);

    expect(makeBaseService).toHaveBeenCalledWith(UpdateRuralProducerService);
    expect(mockUpdateService.execute).toHaveBeenCalledWith({
      id: '1',
      totalFarmArea: 100,
      arableArea: 50,
    });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Dados atualizados com sucesso!' });
  });

  it('should return status 400 if there is an error in the update', async () => {
    (mockUpdateService.execute as jest.Mock).mockRejectedValue(new Error('Erro na atualização'));

    await controller.update(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro na atualização' });
  });
});

describe('RuralProducerController - delete', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let controller: RuralProducerController;
  let mockDeleteService: Partial<DeleteRuralProducerService>;

  beforeEach(() => {
    mockDeleteService = {
      execute: jest.fn().mockResolvedValue({ message: 'Produtor excluído com sucesso!' }),
    };

    (makeBaseService as jest.Mock).mockReturnValue(mockDeleteService);

    mockRequest = {
      params: { id: '1' },
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    controller = new RuralProducerController();
  });

  it('should delete the producer and return status 200', async () => {
    await controller.delete(mockRequest as Request, mockResponse as Response);

    expect(makeBaseService).toHaveBeenCalledWith(DeleteRuralProducerService);
    expect(mockDeleteService.execute).toHaveBeenCalledWith({ id: '1' });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Produtor excluído com sucesso!' });
  });

  it('should return status 400 if there is an error in the deletion', async () => {
    (mockDeleteService.execute as jest.Mock).mockRejectedValue(new Error('Erro na exclusão'));

    await controller.delete(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro na exclusão' });
  });
});
