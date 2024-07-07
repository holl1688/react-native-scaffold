import { Modal, TouchableOpacity, StyleSheet } from 'react-native';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// 创建Modal上下文Context
const ModalContext = createContext({
  showModal: (_content: React.JSX.Element, _data?: Record<string, any>) => {},
  hideModal: () => {},
});

// 导出Modal上下文Hook
export const useModal = () => useContext(ModalContext);

/**
 * 创建全局Modal弹窗组件<Provider>
 * @param children: 弹窗显示内容
 */
export default function ModalProvider({ children }: { children: ReactNode }) {
  const [modalData, setModalData] = useState<Record<string, any>>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  /**
   * 显示弹窗
   * @param content 弹窗内容
   */
  const showModal = (content: JSX.Element, data: Record<string, any> = {}) => {
    setModalContent(content);
    setModalVisible(true);
    setModalData(data);
  };

  /**
   * 隐藏弹窗
   */
  const hideModal = () => {
    setModalVisible(false);
    setModalContent(null);
    setModalData({});
  };

  /**
   * 点击遮罩层事件
   */
  const maskClick = () => {
    if (modalData.backdropDismiss) {
      hideModal();
    }
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal visible={modalVisible} animationType={modalData.animation} transparent={true} onRequestClose={hideModal}>
        <TouchableOpacity activeOpacity={1} style={styles.mask} onPress={maskClick}>
          {/* 动态显示内容<通过showModal传入> */}
          {modalContent}
        </TouchableOpacity>
      </Modal>
    </ModalContext.Provider>
  );
}

// 样式
const styles = StyleSheet.create({
  mask: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
