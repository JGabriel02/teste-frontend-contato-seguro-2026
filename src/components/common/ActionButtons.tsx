import { Button, Popconfirm, Space } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

interface ActionButtonsProps {
  onView: () => void;
  onDelete: () => void;
}

/**
 * Componente reutilizável para ações padrão de tabela
 * Utilizado em BooksPage e AuthorsPage
 */
export default function ActionButtons({
  onView,
  onDelete,
}: ActionButtonsProps) {
  return (
    <Space>
      {/* botão com ícone e texto */}
      <Button icon={<EyeOutlined />} onClick={onView}>
        Ver detalhes
      </Button>

      <Popconfirm title="Tem certeza que deseja deletar?" onConfirm={onDelete}>
        <Button danger icon={<DeleteOutlined />}>
          Deletar
        </Button>
      </Popconfirm>
    </Space>
  );
}