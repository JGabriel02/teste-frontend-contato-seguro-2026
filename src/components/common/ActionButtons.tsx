import { Button, Popconfirm, Space } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

/**
 * Props do componente ActionButtons.
 * @property onView callback chamado quando o botão de visualização é clicado
 * @property onDelete callback chamado quando a exclusão é confirmada
 */
interface ActionButtonsProps {
  onView: () => void;
  onDelete: () => void;
}

/**
 * Componente reutilizável que renderiza botões de ação usados em tabelas.
 * Mostra botão de visualização e botão de exclusão (com Popconfirm).
 */
export default function ActionButtons({ onView, onDelete }: ActionButtonsProps) {
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
