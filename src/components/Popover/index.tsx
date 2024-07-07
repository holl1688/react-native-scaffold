import React, { useState, useRef, useEffect } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, LayoutChangeEvent } from 'react-native';

export let togglePopup: () => void;

export default function Popover({ children, popover }: { children: JSX.Element; popover: JSX.Element }) {
  const [isVisible, setIsVisible] = useState(false);
  const [popoverWidth, setPopoverWidth] = useState(0);
  const triggerRef = useRef<TouchableOpacity | null>(null);
  const [popoverPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  togglePopup = () => setIsVisible(!isVisible);

  useEffect(() => {
    if (triggerRef.current) {
      triggerRef.current.measure((_fx, _fy, width, height, px, py) => {
        const leftPosition = px + width - popoverWidth; // 计算弹窗左边距，以实现右对齐
        setPopupPosition({ top: py + height, left: leftPosition });
      });
    }
  }, [isVisible, popoverWidth]);

  const popoverLayout = (event: LayoutChangeEvent) => {
    setPopoverWidth(event.nativeEvent.layout.width);
  };

  return (
    <View>
      <TouchableOpacity ref={triggerRef} onPress={togglePopup}>
        {children}
      </TouchableOpacity>
      {isVisible && (
        <Modal transparent={true} visible={isVisible} onRequestClose={togglePopup}>
          <TouchableOpacity style={styles.overlay} onPress={togglePopup}>
            <View onLayout={popoverLayout} style={[styles.popup, { top: popoverPosition.top, left: popoverPosition.left }]}>
              {popover}
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  popup: {
    position: 'absolute',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
